import { useState } from 'react';
import React from 'react';

export default function menurender_customhook() {
  const [flag_menu, setflag_menu] = useState(false);

  const change_flag = async () => {
    setflag_menu(true);
  };
  return {
    flag_menu,
    change_flag,
  };
}
