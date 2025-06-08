const getHighestVotes = (obj: { votes: any }) => {
  const R = require("ramda");

  const votes = obj.votes;
  const highestVotes = R.pipe(
    R.toPairs,
    R.reduce(
      (acc: { keys: string[]; value: number }, [key, value]: any) => {
        if (value > acc.value) {
          return { keys: [key], value };
        } else if (value === acc.value) {
          return { keys: [...acc.keys, key], value };
        } else {
          return acc;
        }
      },
      {
        keys: [],
        value: -Infinity,
      }
    )
  );
  return highestVotes(votes).keys;
};
export default getHighestVotes;
