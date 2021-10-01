// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline) 
        external returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn, 
        uint amountOutMin, 
        address[] calldata path, 
        address to, 
        uint deadline)
        external returns (uint[] memory amounts);
    
    function swapExactETHForTokens(
        uint amountOutMin, 
        address[] calldata path, 
        address to, 
        uint deadline)
        external payable returns (uint[] memory amounts);

    function WETH()
        external pure returns (address);

    function getAmountsOut(
        uint amountIn, 
        address[] memory path) 
        external view returns (uint[] memory amounts);
}

interface IERC20 {
    function transferFrom(
        address from, 
        address to, 
        uint value) 
        external returns (bool);

    function approve(
        address spender, 
        uint value) 
        external returns (bool);

    function transfer(
        address recipient, 
        uint amount) 
        external returns (bool);
}

interface IWETH {
    function deposit()
        external payable;
        
    function withdraw(uint) 
        external;

    function transfer(
        address to, 
        uint value) 
        external returns (bool);
}

contract Swap {
    IUniswapV2Router02 uniRouter;
    IUniswapV2Router02 sushiRouter;
    // IUniswapV2Router02 quickRouter;
    IWETH WETH;
    address immutable owner;
    bool private isSingleEth;
    bool private isMultiToSingleToken;
    address private inputToken;
    address private outputToken;

    constructor() 
    {
        owner = 0xD5Cd7dC05279653F960736482aBc7A7B2bF39B5d;
        uniRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
        sushiRouter = IUniswapV2Router02(0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506);
        // quickRouter = IUniswapV2Router02(0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff);
        // uniRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    }

    function _swapToken(IUniswapV2Router02 _router, uint _amountIn, address[] memory _path, address _to, address _tokenAddress, bool _isEth) private returns (uint[] memory amounts)
    {
        if (_isInputAllEth() || (_isEth && isMultiToSingleToken))
        {
            if (_isWrapUnwrap(_path[0], _path[1]))
            {
                WETH = IWETH(_path[0]);
                WETH.deposit{value: _amountIn}();
                assert(WETH.transfer(msg.sender, _amountIn));
            }
            else
            {
                return _router.swapExactETHForTokens{value: _amountIn}(
                    0,
                    _path, 
                    _to, 
                    block.timestamp + 180
                );
            }
        }
        else 
        {
            IERC20(_tokenAddress).approve(address(_router), _amountIn+100000000000000000000);
            return _router.swapExactTokensForTokens(
                _amountIn,
                0,
                _path,
                _to,
                block.timestamp + 180
            );
        }
    }

    function _swapToETH(address _firstPath, address _secondPath, IUniswapV2Router02 _router, uint _amountIn) private
    {
        if (_isWrapUnwrap(_firstPath, _secondPath))
        {
            WETH = IWETH(_firstPath);
            WETH.withdraw(_amountIn);
            (bool success, ) = msg.sender.call{value: _amountIn}("");
            require(success, "Unwrap ETH Failed");
        }
        else
        {
            uint _amount = ((_amountIn*uint(3))/uint(1000));
            _amountIn=_amountIn-_amount;
            IERC20(_firstPath).transfer(owner,_amount);

            address[] memory _path = new address[](2);
            _path[0] = _firstPath;
            _path[1] = _secondPath;
            IERC20(_firstPath).approve(address(_router), _amountIn);
            _router.swapExactTokensForETH(
                _amountIn,
                0,
                _path,
                msg.sender,
                block.timestamp + 180
            );
        }
    }

    function _everySwapToEth(uint _amountIn, address _token, uint8 _swapRoute) private
    {
        IERC20(_token).transferFrom(msg.sender, address(this), _amountIn);

        // 1 => Dfyn
        if (_swapRoute == 1) 
        {
            _swapToETH(_token, uniRouter.WETH(), uniRouter, _amountIn);
        }

        // 5 => Sushi
        else if (_swapRoute == 5) 
        {
            _swapToETH(_token, sushiRouter.WETH(), sushiRouter, _amountIn);
        }

        // 9 => Quick
        // else if (_swapRoute == 9) 
        // {
        //     _swapToETH(_token, quickRouter.WETH(), quickRouter, _amountIn);
        // }
    }

    function _firstOption(IUniswapV2Router02 _router, uint _amountIn, bool _isEth) private
    {
        address[] memory _path = new address[](2);
        _path[0] = inputToken;
        _path[1] = outputToken;
        _swapToken(_router, _amountIn, _path, msg.sender, inputToken, _isEth);
    }

    function _secondOption(address _secondPath, IUniswapV2Router02 _router, uint _amountIn, bool _isEth) private
    {
        address[] memory _path = new address[](3);
        _path[0] = inputToken;
        _path[1] = _secondPath;
        _path[2] = outputToken;
        _swapToken(_router, _amountIn, _path, msg.sender, inputToken, _isEth);
    }

    function _thirdOption(address _secondPath, address _thirdPath, IUniswapV2Router02 _firstRouter, IUniswapV2Router02 _secondRouter, uint _amountIn, bool _isEth) private
    {
        // Swap inputToken to dfynWMatic using dfynRouter
        address[] memory _path = new address[](2);
        uint[] memory _amount2 = new uint[](2);
        uint[] memory _amount3 = new uint[](2);
        _path[0] = inputToken;
        _path[1] = _secondPath;
        _amount2 = _swapToken(_firstRouter, _amountIn, _path, address(this), inputToken, _isEth);
        // Swap dfynWMatic to sushiWMatic using dfynRouter
        _path[0] = _secondPath;
        _path[1] = _thirdPath;
        _amount3 = _swapToken(_firstRouter, _amount2[_amount2.length-1], _path, address(this), _secondPath, _isEth);
        // Swap sushiWMatic to _tokenTarget using sushiRouter
        _path[0] = _thirdPath;
        _path[1] = outputToken;
        _swapToken(_secondRouter, _amount3[_amount3.length-1], _path, msg.sender, _thirdPath, _isEth);
    }

    function _forthOption(address _secondPath, address _thirdPath, IUniswapV2Router02 _firstRouter, IUniswapV2Router02 _secondRouter, uint _amountIn, bool _isEth) private
    {
        // Swap inputToken to sushiWMatic using sushiRouter
        address[] memory _path = new address[](2);
        uint[] memory _amount2 = new uint[](2);
        uint[] memory _amount3 = new uint[](2);
        _path[0] = inputToken;
        _path[1] = _secondPath;
        _amount2 = _swapToken(_firstRouter, _amountIn, _path, address(this), inputToken, _isEth);
        // Swap sushiWMatic to dfynWMatic using dfynRouter
        _path[0] = _secondPath;
        _path[1] = outputToken;
        _amount3 = _swapToken(_secondRouter, _amount2[_amount2.length-1], _path, msg.sender, _secondPath, _isEth);
        // Swap dfynWMatic to _tokenTarget using dfynRouter
        // _path[0] = _thirdPath;
        // _path[1] = outputToken;
        // _swapToken(_secondRouter, _amount3[_amount3.length-1], _path, msg.sender, _thirdPath, _isEth);
    }

    function _fifthOption(address _secondPath, IUniswapV2Router02 _firstRouter, IUniswapV2Router02 _secondRouter, uint _amountIn, bool _isEth) private
    {
        // Swap inputToken to sushiWMatic using sushiRouter
        address[] memory _path = new address[](2);
        uint[] memory _amount2 = new uint[](2);
        _path[0] = inputToken;
        _path[1] = _secondPath;
        _amount2 = _swapToken(_firstRouter, _amountIn, _path, address(this), inputToken, _isEth);
        // Assume sushiWMatic = quickWMatic
        // Swap quickWMatic to _tokenTarget using quickRouter
        _path[0] = _secondPath;
        _path[1] = outputToken;
        _swapToken(_secondRouter, _amount2[_amount2.length-1], _path, msg.sender, _secondPath, _isEth);
    }

    function _isInputAllEth() private view returns (bool)
    {
        return !isMultiToSingleToken && isSingleEth;
    }

    function _isWrapUnwrap(address _firstPath, address _secondPath) private view returns (bool)
    {
        return _firstPath == _secondPath && (_firstPath == uniRouter.WETH() || _firstPath == sushiRouter.WETH());
    }

    function _getToken(address _firstAddress, address _secondAddress, bool _isMultiToSingleToken, uint8 _swapRoute, bool _isInputToken) private view returns (address)
    {
        if ((_isMultiToSingleToken && _isInputToken) || (!_isMultiToSingleToken && !_isInputToken))
        {
            return _firstAddress;
        }
        else if ((_isMultiToSingleToken && !_isInputToken) || (!_isMultiToSingleToken && _isInputToken))
        {
            if (_isInputAllEth() && _isInputToken && _swapRoute == 1)
            {
                return uniRouter.WETH();
            }
            return _secondAddress;
        }
    }

    function swap(uint[] memory _amountIn, address[] memory _token, uint8[] memory _swapRoute, bool[] memory _isEth, address _tokenTarget, bool _isMultiToSingleToken, bool _isSingleEth) public payable
    {
        isSingleEth = _isSingleEth;
        isMultiToSingleToken = _isMultiToSingleToken;
        for (uint8 i = 0; i < _token.length; i++)
        {
            inputToken = _getToken(_token[i], _tokenTarget, _isMultiToSingleToken, _swapRoute[i], true);
            outputToken = _getToken(_token[i], _tokenTarget, _isMultiToSingleToken, _swapRoute[i], false);

            if (_isInputAllEth() || (_isEth[i] && isMultiToSingleToken))
            {
                if (!_isWrapUnwrap(inputToken, outputToken))
                {
                    uint _amount = ((_amountIn[i]*uint(3))/uint(1000));
                    _amountIn[i] = _amountIn[i]-((_amountIn[i]*uint(3))/uint(1000));
                    (bool success, ) = owner.call{value: _amount}("");
                    require(success, "Fee Transfer Failed");
                }
            }
            else if (!_isSingleEth && !_isMultiToSingleToken && _isEth[i])
            {
                _everySwapToEth(_amountIn[i], inputToken, _swapRoute[i]);
                continue;
            }
            else
            {
                IERC20(inputToken).transferFrom(msg.sender, address(this), _amountIn[i]);
                uint _amount = ((_amountIn[i]*uint(3))/uint(1000));
                _amountIn[i]=_amountIn[i]-((_amountIn[i]*uint(3))/uint(1000));
                IERC20(inputToken).transfer(owner,_amount);
            }

            // 1 => Dfyn
            if (_swapRoute[i] == 1) 
            {
                _firstOption(uniRouter, _amountIn[i], _isEth[i]);
            }

            // 2 => Dfyn to Dfyn
            else if (_swapRoute[i] == 2) 
            {
                _secondOption(uniRouter.WETH(), uniRouter, _amountIn[i], _isEth[i]);
            }

            // 3 => Dfyn to Dfyn to Sushi
            else if (_swapRoute[i] == 3) 
            {
                _thirdOption(uniRouter.WETH(), sushiRouter.WETH(), uniRouter, sushiRouter, _amountIn[i], _isEth[i]);
            }

            // 4 => Dfyn to Dfyn to Quick
            // else if (_swapRoute[i] == 4) 
            // {
            //     _thirdOption(uniRouter.WETH(), quickRouter.WETH(), uniRouter, quickRouter, _amountIn[i], _isEth[i]);
            // }

            // 5 => Sushi
            else if (_swapRoute[i] == 5) 
            {
                _firstOption(sushiRouter, _amountIn[i], _isEth[i]);
            }

            // 6 => Sushi to Sushi
            else if (_swapRoute[i] == 6) 
            {
                _secondOption(sushiRouter.WETH(), sushiRouter, _amountIn[i], _isEth[i]);
            }

            // 7 => Sushi to Dfyn to Dfyn
            else if (_swapRoute[i] == 7) 
            {
                _forthOption(sushiRouter.WETH(), uniRouter.WETH(), sushiRouter, uniRouter, _amountIn[i], _isEth[i]);
            }

            // 8 => Sushi to Quick
            // else if (_swapRoute[i] == 8) 
            // {
            //     _fifthOption(sushiRouter.WETH(), sushiRouter, quickRouter, _amountIn[i], _isEth[i]);
            // }

            // 9 => Quick
            // else if (_swapRoute[i] == 9) 
            // {
            //     _firstOption(quickRouter, _amountIn[i], _isEth[i]);
            // }

            // 10 => Quick to Quick
            // else if (_swapRoute[i] == 10) 
            // {
            //     _secondOption(quickRouter.WETH(), quickRouter, _amountIn[i], _isEth[i]);
            // }

            // 11 => Quick to Dfyn to Dfyn
            // else if (_swapRoute[i] == 11) 
            // {
            //     _forthOption(quickRouter.WETH(), uniRouter.WETH(), quickRouter, uniRouter, _amountIn[i], _isEth[i]);
            // }

            // 12 => Quick to Sushi
            // else if (_swapRoute[i] == 12) 
            // {
            //     _fifthOption(quickRouter.WETH(), quickRouter, sushiRouter, _amountIn[i], _isEth[i]);
            // }

            // 13 => Sushi to Dfyn
            else if (_swapRoute[i] == 13) 
            {
                _fifthOption(sushiRouter.WETH(), sushiRouter, uniRouter, _amountIn[i], _isEth[i]);
            }

            // 14 => Quick to Dfyn
            // else if (_swapRoute[i] == 14) 
            // {
            //     _fifthOption(quickRouter.WETH(), quickRouter, uniRouter, _amountIn[i], _isEth[i]);
            // }

            // 15 => Dfyn to Sushi
            else if (_swapRoute[i] == 15) 
            {
                _fifthOption(uniRouter.WETH(), uniRouter, sushiRouter, _amountIn[i], _isEth[i]);
            }

            // 16 => Dfyn to Sushi
            // else if (_swapRoute[i] == 16) 
            // {
            //     _fifthOption(uniRouter.WETH(), uniRouter, quickRouter, _amountIn[i], _isEth[i]);
            // }
        }
    }

    function swapToETH(uint[] memory _amountIn, address[] memory _token, uint8[] memory _swapRoute) public 
    {
        for (uint i = 0; i < _token.length; i++) 
        {
            _everySwapToEth(_amountIn[i], _token[i], _swapRoute[i]);
        }
    }

    receive() payable external {}
}