#! /usr/bin/env node

var jade 	= require('jade');
var fs		= require('fs');
var glob	= require('glob');
var less    = require('less');

function glob_compiler(pattern, compiler){
	glob(pattern, function(err, files){
		if (err) { return console.log(err); }
  	
  		files.forEach(compiler);
	});
}

function jade_compile(filename){
	fs.readFile(filename, 'utf-8', function (err,data) {
 		if (err) { return console.log(err); }

 		var fn = jade.compile(data, {});
 		console.log(fn());
	});
}

function less_compile(filename){

	fs.readFile(filename, 'utf-8', function (err,data) {
 		if (err) { return console.log(err); }

		less.render(data, function (e, css) {
			if (err) { return console.log(err); }	
    		console.log(css);
		});
	});
}

glob_compiler('*.jade', jade_compile);
glob_compiler('*.less', less_compile);

