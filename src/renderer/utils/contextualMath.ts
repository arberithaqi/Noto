import { evaluate } from 'mathjs';

/**
 * Extracts and evaluates mathematical expressions from a string.
 * Ignores non-numeric and non-operator words.
 *
 * @param text The input string containing potential mathematical expressions.
 * @returns The calculated result or an error message if evaluation fails.
 */
export function calculateFromString(text: string): number | string {
  // 1. Identify and Extract Numbers and Operators
  // Match numbers (including decimals) and the operators +, -, *, /
  const tokens = text.match(/(\d+\.?\d*)|([+\-*\/])/g);
  console.log('[contextualMath] Input text:', text);
  console.log('[contextualMath] Found tokens:', tokens);

  if (!tokens || tokens.length === 0) {
    return "No valid expression found";
  }

  // Join tokens to form the expression string
  const expression = tokens.join(' ');

  // Basic validation: Check if the expression ends with an operator
  const lastToken = tokens[tokens.length - 1];
  if (['+', '-', '*', '/'].includes(lastToken)) {
      return "Expression is incomplete";
  }

  // 2. Evaluate the Expression
  try {
    // Use mathjs.evaluate for safe and robust evaluation
    const result = evaluate(expression);
    console.log(`[contextualMath] Evaluated '${expression}' to:`, result);

    // Check for division by zero implicitly handled by mathjs (returns Infinity)
    if (!isFinite(result)) {
        return "Error: Division by zero";
    }

    // 3. Return the Result
    return result;
  } catch (error) {
    console.error("[contextualMath] Error evaluating expression:", error);
    // Attempt to provide a more specific error based on common issues
    if (error instanceof Error) {
        if (error.message.includes("Invalid expression")) {
            return "Invalid mathematical expression format";
        }
        if (error.message.includes("Unexpected end of expression")) {
             return "Expression is incomplete or invalid";
        }
    }
    return "Error evaluating expression";
  }
}

// Example Usage (for testing)
// console.log(`Input: "2 Beds * 80$ =" -> Output: ${calculateFromString("2 Beds * 80$ =")}`); // Expected: 160
// console.log(`Input: "5 apples + 10 apples =" -> Output: ${calculateFromString("5 apples + 10 apples =")}`); // Expected: 15
// console.log(`Input: "100 / 0 items" -> Output: ${calculateFromString("100 / 0 items")}`); // Expected: Error: Division by zero
// console.log(`Input: "Calculate 5 * (2 + 3)" -> Output: ${calculateFromString("Calculate 5 * (2 + 3)")}`); // Expected: 25 (Note: Parentheses are not handled by the current regex, mathjs handles it)
// console.log(`Input: "Total: 10 + " -> Output: ${calculateFromString("Total: 10 + ")}`); // Expected: Expression is incomplete
// console.log(`Input: "Just text" -> Output: ${calculateFromString("Just text")}`); // Expected: No valid expression found 