// Link: {
//   id: (parent) => parent.id,
//   description: (parent) => parent.description,
//   url: (parent) => parent.url,
// },
//the above resolver for link object type is known as a trivial resolver
function postedBy(parent, args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  postedBy,
};
