import { Effect, Match } from "effect";
import { bunLog, bunReadLine } from "../stdlib/bun-effect";

/**
 * Prompts the user for an assignment number and returns it.
 * @returns An Effect that resolves to the assignment number.
 */
const promptAssignmentNumber = () =>
    Effect.gen(function* ($) {
        const _ = yield* $(bunLog("Enter assignment number (1-4): "));
        const line = yield* $(bunReadLine());
        return yield* $(
            Match.value(line).pipe(
                Match.when(undefined, () => Effect.fail("No input")),
                Match.orElse((line) =>
                    Match.value(parseInt(line)).pipe(
                        Match.when(
                            (assignmentNumber) =>
                                assignmentNumber >= 1 && assignmentNumber <= 4,
                            (assignmentNumber) =>
                                Effect.succeed(assignmentNumber)
                        ),
                        Match.orElse(() =>
                            Effect.fail("Invalid assignment number")
                        )
                    )
                )
            )
        );
    });

export default promptAssignmentNumber;
