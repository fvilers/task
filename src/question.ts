import readline from "node:readline";

function question(query: string, defaultAnswer: string = ""): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    // Ensure a white space is always present between the question and the answer
    rl.question(query.trim() + " ", (answer) => {
      rl.close();
      resolve(answer);
    });

    rl.on("SIGINT", () => {
      rl.close();
      resolve(defaultAnswer);
    });
  });
}

export default question;
