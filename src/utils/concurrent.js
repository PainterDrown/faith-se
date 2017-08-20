async function concurrent(tasks) {
  const results = [];
  for (let i = 0; i < tasks.length; ++i) {
    results.push(null);
  }
  for (let i = 0; i < tasks.length; ++i) {
    task.then((result) => {
      results[i] = result;
    });
  }
  await Promise.all(tasks);
  return results;
}

exports = module.exports = concurrent;
