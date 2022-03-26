#!/usr/bin/env node
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import yargsInteractive, { Option } from 'yargs-interactive';
import { CliCommandHandler } from './cli-command-handler';
import { errorHandler } from './error-handler';
import { CliCommand } from './models/interface';

const startCli = () => {
    const options: Option = {
        interactive: { default: true },
        studentId: {
            type: "input",
            describe: "Student ID"
        },
        reportType: {
            type: "number",
            describe: "Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback)"
        }
    };
    console.log('Please enter the following')
    yargsInteractive()
        .usage("$0 <command> [args]")
        .interactive(options)
        .then((result: CliCommand) => {
            const cliCommandHandler = new CliCommandHandler();
            try {
                cliCommandHandler.handle(result);
            } catch (error) {
                errorHandler(error);
                startCli();
            }
        });
}
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);
startCli();


