import subprocess
import json

def format_text_with_ollama(text):
    """Verarbeitet den Text mit dem Mistral-Modell von Ollama lokal."""
    prompt = f"""
    Der folgende Text enthält englische Begriffe, einen Beispielsatz auf Englisch und eine deutsche Übersetzung. 
    Formatiere ihn in eine Python-Liste mit der Struktur: 
    [["Englischer Begriff", "Beispielsatz", "Deutsche Übersetzung"], ...].

    Text:
    {text}

    Ausgabe:
    """

    # Führe den Befehl aus, um das Modell zu verwenden
    result = subprocess.run(
        ["ollama", "run", "mistral", prompt], 
        capture_output=True, 
        text=True,
        encoding='utf-8'  # Setze die Kodierung auf UTF-8
    )

    # Rückgabe des generierten Texts
    return result.stdout.strip()

# Beispieltext
text = """
to have a drink Erin had a drink with me last week. etwas trinken, einen heben
(umgangssprachlich)
to serve food The restaurant definitely serves
food.
Essen servieren
to order something to drink / eat I would like to order something to
drink / eat.
etwas zu trinken / essen bestellen
a farewell drink We met for a farewell drink at his
favourite pub.
ein Abschiedsumtrunk
to prepare breakfast My mother prepared breakfast for
us that day.
das Frühstück zubereiten
a refreshing drink Lemonade is a good refreshing
drink.
ein erfrischendes Getränk
food is wasted A lot of food is wasted in cafés and
restaurants.
Essen wird verschwendet
vegetarian dish I think I’ll order the vegetarian dish. vegetarisches Gericht
spicy food Armin doesn’t like spicy food. scharfes Essen
"""
#mit hilfe der ollama AI ein Array bekommen
result = format_text_with_ollama(text)


#json file leeren vor dem generieren
json_file = "flashcards.json"

# 1️⃣ JSON-Datei leeren, bevor neue Daten generiert werden
with open(json_file, "w", encoding="utf-8") as f:
    json.dump([], f)



# Konvertiere das Ergebnis in ein Python-Array (falls nötig)
try:
    flashcards = json.loads(result)  # Falls das Modell eine JSON-Liste zurückgibt
except json.JSONDecodeError:
    flashcards = [["Fehler", "Beim Parsen der Daten", "Fehler"]]  # Fallback-Wert

# Speichere die Karteikarten in einer JSON-Datei
with open("flashcards.json", "w", encoding="utf-8") as f:
    json.dump(flashcards, f, ensure_ascii=False, indent=4)

print("Karteikarten wurden erfolgreich gespeichert.")


