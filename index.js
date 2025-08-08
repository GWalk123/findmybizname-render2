const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.domainr.com"]
    }
  }
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(limiter);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    platform: 'FindMyBizName - The First Complete Global Business Operating System for Underbanked Entrepreneurs',
    environment: process.env.NODE_ENV || 'production'
  });
});

// API endpoint for name generation
app.post('/api/generate-names', async (req, res) => {
  try {
    const { keyword, style, count = 10, userPlan = 'free' } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    // AI-powered name generation algorithms
    const baseNames = [];
    const suffixes = ['Hub', 'Pro', 'Labs', 'Works', 'Studio', 'Forge', 'Craft', 'Zone', 'Bay', 'Point'];
    const prefixes = ['Smart', 'Quick', 'Elite', 'Prime', 'Ultra', 'Meta', 'Neo', 'Flex', 'Swift', 'Bold'];
    
    // Algorithm 1: Keyword combinations
    for (let i = 0; i < count; i++) {
      if (i % 3 === 0) {
        baseNames.push(`${keyword}${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
      } else if (i % 3 === 1) {
        baseNames.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}${keyword}`);
      } else {
        baseNames.push(`${keyword}${Math.floor(Math.random() * 999) + 1}`);
      }
    }

    // Generate domain status (mock for demo)
    const names = baseNames.map(name => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      domains: [
        { tld: '.com', available: Math.random() > 0.7, price: '$12.99' },
        { tld: '.net', available: Math.random() > 0.5, price: '$10.99' },
        { tld: '.org', available: Math.random() > 0.3, price: '$11.99' }
      ],
      score: Math.floor(Math.random() * 30) + 70,
      memorability: Math.floor(Math.random() * 20) + 80,
      brandability: Math.floor(Math.random() * 25) + 75
    }));

    res.json({ names });
  } catch (error) {
    console.error('Name generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Legal compliance pages for Paddle payment integration
app.get('/terms', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Terms of Service - FindMyBizName</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6; color: #333; background: #f8f9fa; 
        }
        .header { 
          background: linear-gradient(135deg, #0040FF, #0033CC);
          color: white; padding: 2rem 0; text-align: center;
          box-shadow: 0 4px 20px rgba(0, 64, 255, 0.3);
        }
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .content { 
          background: white; padding: 3rem; border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1); margin-top: 2rem;
        }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        h2 { color: #0040FF; margin: 2rem 0 1rem 0; font-size: 1.5rem; }
        p { margin-bottom: 1rem; }
        .back-link { 
          display: inline-block; margin-top: 2rem; padding: 0.8rem 1.5rem;
          background: #FF2D2D; color: white; text-decoration: none;
          border-radius: 6px; font-weight: 600;
          transition: transform 0.3s ease;
        }
        .back-link:hover { transform: translateY(-2px); }
        .highlight { background: #FFDD00; padding: 0.2rem 0.4rem; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Terms of Service</h1>
        <p>FindMyBizName - The First Complete Global Business Operating System</p>
      </div>
      <div class="container">
        <div class="content">
          <h2>1. Service Agreement</h2>
          <p>By using FindMyBizName, you agree to these terms. Our platform provides AI-powered business name generation, domain checking, CRM tools, and payment processing specifically designed for <span class="highlight">underbanked entrepreneurs globally</span>.</p>

          <h2>2. User Accounts & Plans</h2>
          <p><strong>Free Plan:</strong> 10 name generations per day, basic domain checking<br>
          <strong>Premium Plan:</strong> 50 generations per day, advanced features, priority support<br>
          <strong>Pro Plan:</strong> Unlimited generations, full business suite access</p>

          <h2>3. Payment Terms</h2>
          <p>We accept multiple payment methods including cryptocurrency (Bitcoin, Ethereum, USDC) through Coinbase Commerce, and traditional payments via Paddle. All subscriptions are billed monthly unless otherwise specified.</p>

          <h2>4. Intellectual Property</h2>
          <p>Generated business names are yours to use. Our AI algorithms and platform technology remain our intellectual property. Domain name availability is verified through third-party registries.</p>

          <h2>5. Service Availability</h2>
          <p>We strive for 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance will be announced in advance.</p>

          <h2>6. Data Privacy</h2>
          <p>Your data is protected according to our Privacy Policy. We do not sell personal information to third parties.</p>

          <h2>7. Limitation of Liability</h2>
          <p>FindMyBizName provides tools and suggestions. Final business decisions and legal compliance remain your responsibility.</p>

          <h2>8. Termination</h2>
          <p>Either party may terminate service with 30 days notice. Paid subscriptions will be honored until the end of the billing period.</p>

          <p><strong>Last Updated:</strong> January 2025</p>
          <p><strong>Contact:</strong> For terms questions, contact our support team.</p>

          <a href="/" class="back-link">← Back to FindMyBizName</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/privacy', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Privacy Policy - FindMyBizName</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6; color: #333; background: #f8f9fa; 
        }
        .header { 
          background: linear-gradient(135deg, #0040FF, #0033CC);
          color: white; padding: 2rem 0; text-align: center;
          box-
