My attempt at the Library app from the Odin Project.
It works by taken user text input and storing it as a Book object inside a Library array.
Data is stored locally as JSON string, then retrieved and parsed, and given back to the array.
It is needed to loop through the array and set back every object that is not null as a Book object.
Finally, to populate the page on reload, loop again through the library and create the DOM elements needed for each object.
