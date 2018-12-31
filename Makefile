build:
	cd static/vue && yarn install && yarn build
	hugo
	rm -rf public/vue

run:
	hugo serve & cd static/vue && yarn serve