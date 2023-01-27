/*
 * Copyright (c) 2021. https://playio.cloud/
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * All rights reserved.
 */

// import { Input } from 'antd';
// import { InputProps } from 'antd/lib/input/Input';
import { DebounceInput } from 'react-debounce-input';

export const DebounceTextInput = (props) => {
  return <DebounceInput {...props} />;
};
