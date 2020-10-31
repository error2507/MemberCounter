module.exports.run = (id, replayedEvents) => {
	console.log(`[Shard ${id}] resumed. Replay events: ${replayedEvents}`);
};