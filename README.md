
# react-native-css-transform

[![npm](https://img.shields.io/npm/v/react-native-css-transform.svg?style=flat-square)](https://www.npmjs.com/package/react-native-css-transform)
[![npm](https://img.shields.io/npm/dt/react-native-css-transform.svg?style=flat-square)](https://www.npmjs.com/package/react-native-css-transform)

transform css files into js files in `react-native-style`

```bash

$ npm install react-native-css-transform

$ rncss ./styles

```

## TODO

watch files


## DEMO

```css

img {
    flex: 2;
    justify-content: 'center';
    margin: 20 14 20 14;
    background-size: cover;
}

```


```javascript

/**
 * create by react-native-css-transform
 * see: https://github.com/AngusFu/react-native-css-transform
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    "img": {
        "flex": 2,
        "justifyContent": "center",
        "marginTop": 20,
        "marginRight": 14,
        "marginBottom": 20,
        "marginLeft": 14,
        "resizeMode": "cover"
    }
});

export default styles;

```
