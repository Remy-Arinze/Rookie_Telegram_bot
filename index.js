require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
	console.log(ctx);
	ctx.reply("Welcome");
});

// Checks for new members and welcomes them to the group
bot.on("message", (ctx) => {
	console.log({
		" message context": ctx,
	});
	if (ctx.message.new_chat_members !== undefined) {
		const newMembers = ctx.message.new_chat_members;
		newMembers.forEach((member) => {
			ctx.reply(`Welcome to the group, ${member.first_name}!`);
		});
	}
});

bot.command("socials", (ctx) => {
	console.log({ "Socials context": ctx });
	ctx.reply("Here are our social media links", {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: "Twitter", url: "https://twitter.com" },
					{ text: "Discord", url: "https://discord.com" },
				],
				[{ text: "Website", url: "https://yourwebsite.com" }],
			],
		},
	});
});

// Verify user and add to group

const verifiedUsers = new Map();

// Command to request access to the private group
bot.command("verify", (ctx) => {
	console.log("Verifying");
	ctx.reactions;
	// const userId = ctx.from.id;
	// if (!verifiedUsers.has(userId)) {
	// 	// User is not verified, send CAPTCHA challenge
	// 	sendCaptchaChallenge(ctx);
	// } else {
	// 	// User is already verified
	// 	ctx.reply("You are already verified and have access to the group.");
	// }
});

// // Handle messages containing CAPTCHA solutions
// bot.on("message", (ctx) => {
// 	const userId = ctx.from.id;
// 	if (verifiedUsers.has(userId)) {
// 		// Ignore messages from verified users
// 		return;
// 	}

// 	// Check if the message contains the correct answer to the CAPTCHA
// 	const answer = ctx.message.text.trim();
// 	if (verifyCaptchaAnswer(answer)) {
// 		// Mark user as verified
// 		verifiedUsers.set(userId, true);
// 		ctx.reply(
// 			"Congratulations! You have successfully verified yourself and gained access to the group."
// 		);
// 		// Add user to the private group
// 		// code to add user to the private group
// 	} else {
// 		// Incorrect answer
// 		ctx.reply("Incorrect answer. Please try again.");
// 		sendCaptchaChallenge(ctx);
// 	}
// });

// Function to send CAPTCHA challenge
function sendCaptchaChallenge(ctx) {
	// Generate and send CAPTCHA challenge to the user
	// Example: send a simple math problem
	const num1 = Math.floor(Math.random() * 10) + 1;
	const num2 = Math.floor(Math.random() * 10) + 1;
	const correctAnswer = num1 + num2;
	ctx.reply(
		`To gain access to the group, please solve the following math problem: ${num1} + ${num2} = ?`
	);
}

// // Function to verify CAPTCHA answer
// function verifyCaptchaAnswer(answer) {
// 	// Compare the answer with the correct solution
// 	// Example: for a math problem, check if the answer is correct
// 	return parseInt(answer) === correctAnswer;
// }

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
