import { Codes } from './../utils/messages/Codes';
import { ApplicationException } from './../utils/exceptions/ApplicationException';
import cfg from './config';
import { configure, getLogger, Logger } from "log4js";

export class LoggerCfg {

	private static instance: LoggerCfg;

	private constructor(fileName: string) {

		let _appenders:string[] = [];

		if(cfg.logger.logger_root_files_directory){
			_appenders  = ['file', 'out'];
		}else{
			_appenders  = ['out'];
		}

		configure(
			{
				appenders: {
					file: {
						type: 'file',
						filename: cfg.logger.logger_root_files_directory + fileName,
						maxLogSize: 10 * 1024 * 1024, // = 10Mb
						backups: 3, // keep five backup files
						encoding: 'utf-8',
						mode: 0o0640,
						keepFileExt: true,
						flags: 'w+',
						layout: {
							type: 'pattern',
							pattern: '[%d]-%p-[%f{3}:%l]: %m'
						}
					},
					out: {
						type: 'stdout',
						layout: {
							type: 'pattern',
							pattern: '%[%d-%p-[%f{3}:%l]: %m%]'
						}
					}
				},
				categories: {
					default: { appenders: _appenders, level: cfg.logger.logger_root_level, enableCallStack: true }
				}
			}
		);
	}

	public static getLogger(): Logger {
		if (LoggerCfg.instance) {
			return getLogger();
		} else {
			throw new ApplicationException(null, "Logger can´t be initialize", Codes.BC_PCH_00002());
		}
	}

	public static initLogger(fileName: string) {
		if (!LoggerCfg.instance) {
			LoggerCfg.instance = new LoggerCfg(fileName + cfg.logger.logger_file_name);
		}
	}
}

