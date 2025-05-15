// src/plugins/card/services/ai.ts

export async function requestAI(prompt: string, apiKey: string): Promise<string | null> {
    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        let content = data.choices[0].message.content;
        const match = content.match(/```json\s*([\s\S]*?)```/i);
        if (match) {
          content = match[1];
        }
        try {
          const json = JSON.parse(content);
          if (json.result) {
            return json.result;
          } else {
            return content;
          }
        } catch {
          return data.choices[0].message.content;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }