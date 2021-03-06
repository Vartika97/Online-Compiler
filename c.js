<!DOCTYPE html>

<html lang="en">
<head>
    <title>CLP IDE</title>
    <link rel="stylesheet" href="demo/kitchen-sink/styles.css" type="text/css" media="screen" charset="utf-8">
    <script async="true" src="https://use.edgefonts.net/source-code-pro.js"></script>
    <link href="./doc/site/images/favicon.ico" rel="icon" type="image/x-icon">
<script type="text/javascript">
 function save() {
        localStorage.savedValue = editor.getValue(); 
        editor.session.getUndoManager().markClean();
        const v=localStorage.savedValue;  
        alert(v);         
           var http = require('http');
           var child_process=require('child_process');
           var workerProcess=child_process.exec('node server.js',function(error,stdout,stderr){
   if(error)
{
console.log(error.stack);
}
console.log('stdout'+stdout);
console.log('stderr'+stderr);
});
var option = {
    hostname : "localhost" ,
    port : 80 ,
    method : "POST",
    path : "/"
} 

    var request = http.request(option , function(resp){
       resp.on("data",function(chunck){
           console.log(chunck.toString());
       }); 
  
    request.end(); 
}
</script>
</head>
<body>
<form action="/" method="POST">
<div id="optionsPanel" style="width: 120%; height:100%; overflow-y: scroll;">
</div>
<div id="editor-container"></div>
<script src="src/ace.js" data-ace-base="src" type="text/javascript" charset="utf-8"></script>
  <script src="src/keybinding-emacs.js"></script>
  <script src="demo/kitchen-sink/demo.js"></script>
  <script type="text/javascript" charset="utf-8">
    require("kitchen-sink/demo");
  </script>
<input type="Submit" value="Run" id="compile" onclick=save()>
</form>
</body>
</html>