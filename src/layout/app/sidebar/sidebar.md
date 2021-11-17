Side Menu in and out render 

```jsx
      <MHidden width="lgUp" >
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, overflow: 'auto', height: 'auto' }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              height: 'auto',
              overflow: 'auto',
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
```