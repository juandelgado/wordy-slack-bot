default: build
build:
	docker build -t ustwo/wordy-slack-bot .
run:
	docker run \
		-e SLACK_TOKEN \
		-e FIREBASE_PROJECT_ID \
		-e FIREBASE_CLIENT_EMAIL \
		-e FIREBASE_PRIVATE_KEY \
		-e FIREBASE_DB_URL \
		-e FIREBASE_DB_URL \
		--name wordy-slack-bot -d ustwo/wordy-slack-bot
rm:
	docker rm -vf wordy-slack-bot
	docker images -qf 'dangling=true' | awk '{print $1}' | xargs docker rmi
