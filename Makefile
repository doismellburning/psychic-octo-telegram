.PHONY: build
build:
	bundle exec jekyll build


.PHONY: serve
serve:
	python -m http.server --directory ./_site 8877
