function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK");
}
//Subscription resolvers are wrapped inside an object and need to
//be provided as the value for a subscribe field. You also need to
// provide another field called resolve that actually
//returns the data from the data emitted by the AsyncIterator.
const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};
function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
