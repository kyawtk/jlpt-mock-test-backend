import csv
import json
import random

# Load vocabulary dataset
def load_dataset(file_path):
    with open(file_path, encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    return data

# Generate questions in JSON format
def generate_questions(dataset, num_questions=50):
    questions = []
    for _ in range(num_questions):
        item = random.choice(dataset)  # Randomly select from dataset
        question = {
            "type": "vocabulary",
            "content": item.get("content", "Default question content"),
            "passageId": 0,
            "audioUrl": "",
            "imageUrl": "",
            "options": item.get("options", "Option1,Option2,Option3,Option4").split(","),
            "correctOptionIndex": int(item.get("correctOptionIndex", 0)),
            "level": "N5"
        }
        questions.append(question)
    return questions

def load_dataset(file_path):
    with open(file_path, encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    print("Loaded dataset:", data)  # Debug print
    return data

# Main execution
if __name__ == "__main__":
    dataset = load_dataset("n5_vocab_dataset.csv")  # Load dataset
    num_questions = 100  # Define number of questions
    questions = generate_questions(dataset, num_questions)

    # Save questions to a JSON file
    with open("n5_vocab_questions.json", "w", encoding="utf-8") as outfile:
        json.dump(questions, outfile, ensure_ascii=False, indent=4)

    print(f"{num_questions} questions generated and saved to 'n5_vocab_questions.json'")
