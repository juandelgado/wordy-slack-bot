default: build
build:
	docker build -t ustwo/wordy-slack-bot .
run:
	docker run --env SLACK_TOKEN=$(SLACK_TOKEN) --name wordy-slack-bot -d ustwo/wordy-slack-bot
rm:
	docker rm -vf wordy-slack-bot
	docker images -qf 'dangling=true' | awk '{print $1}' | xargs docker rmi
