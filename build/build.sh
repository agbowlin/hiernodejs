#!/bin/bash
echo --- START OF BUILD ---

cd ~/workspace

echo ==========================================

echo === Documenting [hiernode.js]

	jsdoc hiernode.js --configure build/jsdoc.json

echo === Wrote to [docs/]
echo === Documentation completed.

echo ==========================================

echo === Compiling [hiernode.js]
ls -l hiernode.js
echo ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
		--compilation_level SIMPLE			\
		--warning_level VERBOSE				\
		--js hiernode.js					\
		--js_output_file hiernode.min.js	\

echo ...
ls -l hiernode.min.js
echo === Compilation completed

echo ==========================================

echo --- END OF BUILD ---
