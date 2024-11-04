import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // 1. Create the Test for JLPT N5
    const test = await prisma.test.create({
        data: {
            level: "N5",
            title: "JLPT N5 Mock Test",
            description: "A full mock test for JLPT N5 level with Vocabulary, Grammar, Reading, and Listening sections.",
        },
    });

    // Create Sections
    const sectionsData = [
        { name: "Vocabulary", description: "Basic vocabulary questions" },
        { name: "Grammar", description: "Grammar questions covering particles and sentence structure" },
        { name: "Reading", description: "Reading comprehension questions" },
        { name: "Listening", description: "Listening comprehension questions" },
    ];

    const sections = {};
    for (const section of sectionsData) {
        sections[section.name] = await prisma.section.create({
            data: { ...section },
        });
    }

    // Vocabulary Questions (Realistic Japanese Text)
    const vocabQuestions = [
        {
            section: sections["Vocabulary"].id,
            content: "「猫」の意味は何ですか？",
            options: ["猫", "犬", "鳥", "魚"],
            correct: "猫",
        },
        {
            section: sections["Vocabulary"].id,
            content: "「学校」の読み方はどれですか？",
            options: ["がっこう", "こうこう", "だいがく", "しょうがっこう"],
            correct: "がっこう",
        },
    ];

    // Grammar Questions
    const grammarQuestions = [
        {
            section: sections["Grammar"].id,
            content: "どの助詞が正しいですか？ 私___学生です。",
            options: ["は", "が", "を", "に"],
            correct: "は",
        },
        {
            section: sections["Grammar"].id,
            content: "この文を完成させてください：これは____本です。",
            options: ["大きな", "小さな", "かわいい", "高い"],
            correct: "大きな",
        },
    ];

    // Reading Questions (Passage + Questions)
    const readingQuestions = [
        {
            section: sections["Reading"].id,
            content: "以下の文を読んで、質問に答えてください。",
            passage: "山田さんは毎朝コーヒーを飲みます。それから会社に行きます。",
            options: ["山田さんは毎晩コーヒーを飲みます。", "山田さんは毎朝コーヒーを飲みます。", "山田さんは朝ごはんを食べます。", "山田さんは夜にコーヒーを飲みます。"],
            correct: "山田さんは毎朝コーヒーを飲みます。",
        },
        {
            section: sections["Reading"].id,
            content: "この文によると、山田さんの習慣は何ですか？",
            passage: "山田さんは毎朝コーヒーを飲みます。それから会社に行きます。",
            options: ["山田さんは夜に会社に行きます。", "山田さんは朝に会社に行きます。", "山田さんは週末だけ会社に行きます。", "山田さんはいつも家にいます。"],
            correct: "山田さんは朝に会社に行きます。",
        },
    ];

    // Listening Questions (Audio + Japanese Text)
    const listeningQuestions = [
        {
            section: sections["Listening"].id,
            content: "オーディオを聞いて質問に答えてください。",
            audioUrl: "https://example.com/audio1.mp3",
            options: ["はい", "いいえ", "わかりません", "ありません"],
            correct: "はい",
        },
        {
            section: sections["Listening"].id,
            content: "話し手の予定について、正しいのはどれですか？",
            audioUrl: "https://example.com/audio2.mp3",
            options: ["出かけます", "休みます", "働きます", "食べます"],
            correct: "出かけます",
        },
    ];

    // Utility to seed questions with options and correct answers
    const seedQuestions = async (questions, testId) => {
        for (const q of questions) {
            const question = await prisma.question.create({
                data: {
                    testId,
                    sectionId: q.section,
                    type: "vocabulary", // Use correct type based on section
                    content: q.content,
                    passage: q.passage || null,
                    audioUrl: q.audioUrl || null,
                },
            });

            // Create Options
            for (const [index, optionContent] of q.options.entries()) {
                const option = await prisma.option.create({
                    data: {
                        questionId: question.id,
                        label: String.fromCharCode(65 + index), // A, B, C, D
                        content: optionContent,
                    },
                });

                // Mark correct answer
                if (optionContent === q.correct) {
                    await prisma.answer.create({
                        data: {
                            questionId: question.id,
                            optionId: option.id,
                        },
                    });
                }
            }
        }
    };

    await seedQuestions(vocabQuestions, test.id);
    await seedQuestions(grammarQuestions, test.id);
    await seedQuestions(readingQuestions, test.id);
    await seedQuestions(listeningQuestions, test.id);

    console.log(`Successfully seeded JLPT N5 test data with real Japanese content for test ID: ${test.id}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
