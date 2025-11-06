// routes/ai.js
const express = require("express");
const { OpenAI } = require("openai");
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===== DeepThink Chat (GPT-4o Mini) =====
router.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ 
      error: "Message is required",
      example: { "message": "Your question here" }
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // Always use GPT-4o Mini for deep thinking
      messages: [
        { 
          role: "system", 
          content: `You are a helpful coding assistant and learning companion. Provide detailed, educational responses that help users understand programming concepts, best practices, and coding techniques. 

Guidelines:
- Give comprehensive explanations with examples
- Break down complex concepts into understandable parts
- Provide code examples when relevant
- Explain the "why" behind concepts
- Use analogies to make technical concepts relatable
- Suggest best practices and common pitfalls
- Aim for educational value in every response` 
        },
        { role: "user", content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ 
      reply: reply,
      model: "gpt-4o-mini",
      mode: "deepthink",
      tokens_used: completion.usage?.total_tokens,
      status: "success"
    });
  } catch (error) {
    console.error("❌ OpenAI API error (DeepThink):", error);
    
    // Handle specific API errors
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: "Invalid OpenAI API key",
        details: "Please check your OPENAI_API_KEY in environment variables"
      });
    } else if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: "API quota exceeded",
        details: "Please check your OpenAI billing and usage limits"
      });
    } else if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: "Rate limit exceeded",
        details: "Please wait a moment before making another request"
      });
    } else if (error.code === 'model_not_found') {
      return res.status(400).json({ 
        error: "Model not available",
        details: "The requested AI model is not available. Please try another model."
      });
    }
    
    res.status(500).json({ 
      error: "Failed to get AI response",
      details: error.message
    });
  }
});

// ===== Quick Chat (GPT-3.5 Turbo) =====
router.post("/chat/fast", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ 
      error: "Message is required",
      example: { "message": "Your question here" }
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // Always use GPT-3.5 Turbo for quick answers
      messages: [
        { 
          role: "system", 
          content: `You are a helpful coding assistant. Provide brief, concise answers. 

Guidelines:
- Keep responses under 100 words when possible
- Focus on the key points only
- Be direct and to the point
- Use simple language
- Avoid lengthy explanations
- If code is needed, provide minimal examples
- Prioritize speed over completeness` 
        },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ 
      reply: reply,
      model: "gpt-3.5-turbo",
      mode: "quick",
      tokens_used: completion.usage?.total_tokens,
      status: "success"
    });
  } catch (error) {
    console.error("❌ OpenAI API error (Quick):", error);
    
    // Handle specific API errors
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: "Invalid OpenAI API key",
        details: "Please check your OPENAI_API_KEY in environment variables"
      });
    } else if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: "API quota exceeded",
        details: "Please check your OpenAI billing and usage limits"
      });
    } else if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: "Rate limit exceeded",
        details: "Please wait a moment before making another request"
      });
    } else if (error.code === 'model_not_found') {
      // Fallback to gpt-4o-mini if gpt-3.5-turbo is not available
      console.log("⚠ GPT-3.5 Turbo not available, falling back to GPT-4o Mini");
      try {
        const fallbackCompletion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: "Provide a very brief, concise answer. Keep it under 100 words." 
            },
            { role: "user", content: message }
          ],
          max_tokens: 150,
          temperature: 0.3,
        });

        const fallbackReply = fallbackCompletion.choices[0].message.content;
        
        return res.json({ 
          reply: fallbackReply,
          model: "gpt-4o-mini",
          mode: "quick",
          tokens_used: fallbackCompletion.usage?.total_tokens,
          fallback: true,
          status: "success"
        });
      } catch (fallbackError) {
        console.error("❌ Fallback also failed:", fallbackError);
      }
    }
    
    res.status(500).json({ 
      error: "Failed to get AI response",
      details: error.message
    });
  }
});

// ===== Test Route =====
router.get("/test", async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Say OK if you're working properly. Keep it very short." }
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ 
      status: "ok", 
      reply: reply.trim(),
      model: "gpt-4o-mini",
      message: "AI service is working correctly",
      timestamp: new Date().toISOString(),
      available_models: ["gpt-4o-mini", "gpt-3.5-turbo"]
    });
  } catch (error) {
    console.error("❌ OpenAI API test error:", error);
    res.status(500).json({ 
      error: "AI service test failed",
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ===== Health Check =====
router.get("/health", async (req, res) => {
  try {
    const isHealthy = !!process.env.OPENAI_API_KEY;
    const healthStatus = isHealthy ? "healthy" : "unhealthy";
    
    // Additional health checks
    const healthDetails = {
      status: healthStatus,
      openai_configured: !!process.env.OPENAI_API_KEY,
      openai_key_length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
      timestamp: new Date().toISOString(),
      service: "Learning Companion AI",
      environment: process.env.NODE_ENV || "development",
      available_endpoints: [
        "POST /api/ai/chat - DeepThink (GPT-4o Mini)",
        "POST /api/ai/chat/fast - Quick Answer (GPT-3.5 Turbo)", 
        "GET /api/ai/test - Test endpoint",
        "GET /api/ai/health - Health check",
        "GET /api/ai/models - Available models"
      ]
    };

    res.json(healthDetails);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ===== Get Available Models =====
router.get("/models", async (req, res) => {
  try {
    const availableModels = [
      {
        id: "gpt-4o-mini",
        name: "GPT-4o Mini",
        description: "Advanced model for detailed, comprehensive responses",
        max_tokens: 16384,
        capabilities: ["text", "complex reasoning", "detailed explanations"],
        best_for: ["Complex problems", "Detailed explanations", "Learning concepts", "Code analysis"],
        used_in: "DeepThink mode",
        cost: "Medium"
      },
      {
        id: "gpt-3.5-turbo",
        name: "GPT-3.5 Turbo",
        description: "Fast and efficient model for quick responses",
        max_tokens: 4096,
        capabilities: ["text", "basic reasoning", "quick responses"],
        best_for: ["Quick answers", "Simple questions", "Basic code snippets", "Fast responses"],
        used_in: "Quick Answer mode", 
        cost: "Low"
      }
    ];

    res.json({
      models: availableModels,
      current_setup: {
        deepthink_model: "gpt-4o-mini",
        quick_model: "gpt-3.5-turbo",
        description: "Two-model system optimized for different use cases"
      },
      status: "success"
    });
  } catch (error) {
    console.error("❌ Models endpoint error:", error);
    res.status(500).json({ 
      error: "Failed to fetch available models",
      details: error.message
    });
  }
});

// ===== Batch Test Multiple Models =====
router.post("/test-models", async (req, res) => {
  try {
    const { message = "What is a JavaScript closure?" } = req.body;
    
    const modelsToTest = [
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" }
    ];

    const results = [];
    
    for (const model of modelsToTest) {
      try {
        const startTime = Date.now();
        const completion = await client.chat.completions.create({
          model: model.id,
          messages: [
            { role: "user", content: message }
          ],
          max_tokens: 200,
        });
        const endTime = Date.now();
        
        results.push({
          model: model.name,
          model_id: model.id,
          response: completion.choices[0].message.content,
          response_time: `${endTime - startTime}ms`,
          tokens_used: completion.usage?.total_tokens,
          success: true
        });
      } catch (modelError) {
        results.push({
          model: model.name,
          model_id: model.id,
          error: modelError.message,
          success: false
        });
      }
    }

    res.json({
      test_message: message,
      results: results,
      timestamp: new Date().toISOString(),
      status: "completed"
    });
  } catch (error) {
    console.error("❌ Model test error:", error);
    res.status(500).json({
      error: "Failed to test models",
      details: error.message
    });
  }
});

module.exports = router;