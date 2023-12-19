import { Effect, Either, Option, pipe } from "effect";
import { bunReadFile } from "../stdlib/bun-effect";
import parse from "../parser/parse";
import { ERROR } from "../constants";

/**
 * Constructs a single fiber that reads the logs for a student to calculate their grade and returns it.
 * @param netID The student's netID
 * @returns An Effect that resolves to a tuple of the netID and grade.
 */
const readLogs = (netID: string) =>
    Effect.gen(function* ($) {
        console.log(`Parsing logs for ${netID}...`);

        const logs = yield* $(
            Effect.either(bunReadFile(`tmp/${netID}/logs.json`))
        );

        return Either.isLeft(logs)
            ? ([netID, ERROR] as const)
            : ([netID, "" + (yield* $(parse(logs.right)))] as const);
    });

export default readLogs;
