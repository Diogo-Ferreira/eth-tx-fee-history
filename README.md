
# Introduction

Web page that shows you the average transaction fee paid in Ethereum over time (24h, 1 week, 1 month)

Stack: Next.js, Typescript, Tailwind, Recharts

# Development Setup

Node Version: 20

set Owlracle `API_KEY` in env environment or `.env` file.

```
npm i
npm run dev
```


# Possible improvements

* Custom date range
* Api calls to Owlracle API may be slow sometimes or depending the range, moving the call to the client may improve user experience
* Improve X axis interval and domain
