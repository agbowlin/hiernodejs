#!/usr/bin/bash
echo --- START OF BUILD ---

# java -jar node_modules/google-closure-compiler/compiler.jar --help

echo Compiling [hiernode.js] to [hiernode.min.js] ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
		--compilation_level SIMPLE			\
		--warning_level VERBOSE				\
		--js hiernode.js					\
		--js_output_file hiernode.min.js	\

echo Compilation completed.

echo --- END OF BUILD ---
