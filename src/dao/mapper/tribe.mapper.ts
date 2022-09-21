import { ITribeResponseDetailsDTO } from './../../services/api/dto/responses/TribeResponsesDTO';
import { repositoryStateStrEnum, repositoryStateValEnum, repositoryVerificationCodeVal, repositoryVerificationCodeStr } from './../../utils/enums/repository.enum';
import { CommonUtils } from './../../utils/common.utils';

export const TribeMapper = {

    GET_METRICS_A_TRIBE: function (result: any[]): ITribeResponseDetailsDTO[] {
        let metrics: ITribeResponseDetailsDTO[] = [];
        if (result) {
            metrics = result.map((trb) => {
                return {
                    ...trb,
                    coverage: `${(trb.coverage*100)}%`,
                    verificationState: this.GET_VERIFICATION_STATE_BY_REPOSITORY_ID(trb.id),
                    state: this.GET_STATE_REPOSITORY(trb.state),
                }
            });
        }
        return metrics;
    },

    GET_STATE_REPOSITORY: function (state: string): string {
        let state_ = '';
        switch(state) {
            case repositoryStateValEnum.ENABLE:
                state_ = repositoryStateStrEnum.E;
                break;
            case repositoryStateValEnum.DISABLE:
                state_ = repositoryStateStrEnum.D;
                break;
            case repositoryStateValEnum.ARCHIVED:
                state_ = repositoryStateStrEnum.A;
                break;
        }
        return state_;
    },

    GET_VERIFICATION_STATE_BY_REPOSITORY_ID: function (repository_id: number): string {
        let verificationState = '';
        let veification_state_found = CommonUtils.getRepositoriesMockData();
        let found = veification_state_found.filter((itm) => itm.id === repository_id);
        if (found.length > 0) {
            let rep = found[0];
            switch(rep.state) {
                case repositoryVerificationCodeVal.VERIFY:
                    verificationState = repositoryVerificationCodeStr.VERIFY;
                    break;
                case repositoryVerificationCodeVal.WAIT:
                    verificationState = repositoryVerificationCodeStr.WAIT;
                    break;
                case repositoryVerificationCodeVal.APPROVED:
                    verificationState = repositoryVerificationCodeStr.APPROVED;
                    break;
            }
        }
        return verificationState;
    },

}