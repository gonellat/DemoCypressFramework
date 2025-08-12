export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow commented-out code",
    },
    schema: [],
    messages: {
      commentedCode: "Commented-out code should be removed.",
    },
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getAllComments();
        const codeLikePattern = /^\s*(const|let|var|function|class|cy\.)/;

        comments.forEach((comment) => {
          if (codeLikePattern.test(comment.value.trim())) {
            context.report({
              loc: comment.loc,
              messageId: "commentedCode",
            });
          }
        });
      },
    };
  },
};
