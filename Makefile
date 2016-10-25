default: build
build:
	docker build -t ustwo/wordy-slack-bot .
run:
	docker run --env SLACK_API_TOKEN=$(SLACK_API_TOKEN) -d ustwo/wordy-slack-bot
