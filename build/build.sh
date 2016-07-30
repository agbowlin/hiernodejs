#!/usr/bin/bash
echo --- START OF BUILD ---

cd ~/workspace

echo ==========================================

echo Documenting [hiernode.js] ...

	jsdoc \
		hiernode.js				\
		--readme README.md		\
		--destination docs		\
		--verbose				\

echo Wrote to [docs/] ...
echo ... Documentation completed.

echo ==========================================

echo Compiling [hiernode.js] ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
		--compilation_level SIMPLE			\
		--warning_level VERBOSE				\
		--js hiernode.js					\
		--js_output_file hiernode.min.js	\

echo Wrote to [hiernode.min.js] ...
echo ... Compilation completed.

echo ==========================================

echo --- END OF BUILD ---
