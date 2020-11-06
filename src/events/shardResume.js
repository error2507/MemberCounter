module.exports.run = (id, replayedEvents) => {
	console.log(`[Shard ${id}] resumed. Replayed events: ${replayedEvents}`);
};