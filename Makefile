default: build
build:
	docker build -t ustwo/wordy-slack-bot .
run:
	docker run --env SLACK_TOKEN=$(SLACK_TOKEN) -d ustwo/wordy-slack-bot
