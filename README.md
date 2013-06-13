#jquery.multiInput


multiInput is a jQuery plugin. 
The plugin will automatically add another textbox when others are filled. Empty textboxes will be removed

##Requirements
* [jQuery](http://jquery.com/) 1.7.1+

##Example

```html
    <div id="multiInput"></div>
```

```javascript   
    $("#multiInput").multiInput();
```

##Events
| Event         | Params      | Description  |
| ------------- |-------------| -------------|
| mi-input-create  | eventObject, multiInput object, created input element | fired when input is created |
| mi-input-removed | eventObject, multiInput object, removed input element | fired when input is removed |
| mi-input-changed | eventObject, multiInput object, input element, previous value, new value | fired when input value is changed  |
