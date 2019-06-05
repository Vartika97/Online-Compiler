var express = require('express');
var fs =require('fs');
const { exec } = require('child_process');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/my/myaction', function(req, res) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    res.setHeader('Access-Control-Allow-Methods', 'POST');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  var mode=req.body.vartik;
console.log(req.body.vartik);
console.log(req.body.va);
console.log(req.body.Inp);
 var cmd;
 var fil;
if(req.body.Inp!='')
{
 console.log(req.body.Inp);
 fs.writeFile('input.txt',req.body.Inp , function (err) {
  if (err) throw err;
});
}
  if(mode=='Python')
{
   cmd='python newfile.py';
  fil='newfile.py';
  cmd=cmd+' < input.txt';
}
  else if(mode=='Java')
   {
var java =req.body.va;
java=java.replace(/{(.*|\s*)*?}/g,"");
console.log(java);
java=java.replace(/(\/\*(?:(?!\*\/).|[\s])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|(})/g,"");
console.log(java);
var n= java.match(/public(\s+|\n*)*class(\s+|(\n*|\s+)*)[A-Za-z]+/);
console.log(n);
if (n==null)
  res.send({name:"<no> No public class"});
else
{  n=n.toString();
   var v=n.match(/[A-Za-z]+/g);
  cmd='javac '+v[v.length-1]+'.java';
   fil=v[v.length-1]+'.java';
  console.log(v.length-1+" nn "+v[v.length-1]);

}
}
else if(mode=='C++')
{
   cmd='g++ newfile.cpp';
  fil='newfile.cpp';
}
else if(mode=='C')
{
 cmd='gcc newfile.c';
  fil='newfile.c';
}
if(fil!=null)
 fs.writeFile(fil,req.body.va , function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
 exec(cmd, (err, stdout, stderr) => {
  //console.log('Number of files'+v[v.length-1]);
  var warn=stderr;
  //console.log(typeof(warn)); 
 //console.log('Output1'+stderr);
  if (err) {
  if((err)&&(!stderr))
{
 console.log("e"+err); 
   res.json({name:(stdout+'abcd\n'+err)});
}
else
{
  console.log("stderr   "+stderr); 
   res.json({name:stderr});
}
    //console.error(`exec error: ${err}`);
  }
else
{
 if(mode=='Java')
{
 exec('java '+v[v.length-1]+' < input.txt', (err, stdout, stderr) => {
  console.log('Number of files');
  if (((err)&&(warn==''))||(stderr)||(err=='RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded')) 
{  if((err)&&(!stderr))
{
   console.log('File is created error in successfully.'+err);
  res.json({name:(stdout+'\n'+err)});
}else
{
   res.json({name:stderr});
    console.error(`exec error: ${err}`);
}
}
 else
{
 
 res.json({name:(stdout+'\n'+warn)});
}
});
}
else if((mode=='C++')||(mode=='C'))
{console.log(mode);
 exec('./a.out < input.txt',(err,stdout,stderr)=>{
    if(((err)&&(warn==''))||(stderr)||(err=='RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded'))
{  
  if((err)&&(!stderr))
{
   console.log('error'+err);
  res.json({name:(stdout+'\n'+err)});
}
else
{
  console.log('error .'+err);
  res.json({name:stderr});
}
}
else
{
console.log('not error');
res.json({name:(stdout+'\n'+warn)});
}
});
}
else
{
 console.log(`Number of files ${stdout}`);
 res.json({name:stdout});
}
}
});
});
});

app.listen(8080, function() {
  console.log('Server is running');
});
