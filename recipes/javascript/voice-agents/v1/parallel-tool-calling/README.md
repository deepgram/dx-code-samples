# Parallel Tool Calling (Voice Agents v1)

Voice agents often need to gather data from multiple sources in a single turn — checking weather while looking up time zones, or querying a database and an external API simultaneously. Parallel tool calling lets the LLM request multiple functions at once, and your client executes them concurrently with `Promise.all`, reducing perceived latency compared to sequential calls.

When the agent decides it needs multiple tools, Deepgram sends a single `FunctionCallRequest` with an array of functions. Your client runs them all in parallel and sends back individual `FunctionCallResponse` messages. The agent then composes all results into one natural response.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.functions` | `[{name, description, parameters}]` | Array of tool definitions the LLM can invoke |
| `think.functions[].parameters` | JSON Schema object | Describes the expected arguments for each tool |
| `FunctionCallRequest.functions` | Array | Contains one or more function calls — multiple means parallel execution |
| `FunctionCallResponse.id` | String | Must match the `id` from the corresponding request |
| `FunctionCallResponse.content` | String | The tool's result, sent back to the agent |

## Example output

```
Settings applied with 3 tools registered
User: What's the weather, time, and population in New York?
Parallel call: 3 function(s) requested
  get_weather({"city":"New York"}) → New York: 72°F, sunny
  get_time({"timezone":"America/New_York"}) → Current time in America/New_York: 2:30 PM
  get_population({"city":"New York"}) → New York population: 8.3 million
Agent: In New York, it's currently 72°F and sunny. The time is 2:30 PM, and the city has a population of about 8.3 million.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install` (from `recipes/javascript/`)

## Run

```bash
node example.js
```
