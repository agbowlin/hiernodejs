#!/bin/bash
echo --- START OF BUILD ---

# cd ~/workspace

echo ==========================================
echo
echo === Documenting [hiernode.js]
echo === Clearing output [docs/]
rm -fdr docs
echo ...

	node_modules/.bin/jsdoc hiernode.js --configure build/jsdoc.json

echo ...
echo === Documentation succeeded. Wrote to [docs/]
echo
echo ==========================================
echo
echo === Compiling [hiernode.js]
ls -l hiernode.js
echo === Clearing output [hiernode.min.js]
rm -f hiernode.min.js
echo ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
			--js hiernode.js					\
			--js_output_file hiernode.min.js	\
			--externs "build/closure-compiler-externs.js"		\
			--compilation_level SIMPLE			\
			# --warning_level VERBOSE				\
			# --process_common_js_modules			\

echo ...
ls -l hiernode.min.js
echo === Compilation succeeded. Wrote to [hiernode.min.js]
echo
echo ==========================================

echo --- END OF BUILD ---
