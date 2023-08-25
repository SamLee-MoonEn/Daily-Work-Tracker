export interface dailyWorkDataProps {
  readonly dataId: string | undefined;
  readonly region: string;
  readonly customer: string;
  readonly type: string;
  readonly helpdesk: string;
  readonly owner: string;
  readonly timeTaken: number | undefined;
  readonly selectedDate: Date;
  readonly content: string;
  readonly remark: string | undefined;
}

export interface userInfoProps {
  readonly displayName: string;
  readonly email: string;
  readonly uid: string;
}

export interface userInfoUpdatesProps {
  [key: string]: {
    readonly name: string;
    readonly email: string;
  };
}

export interface dailyWorkUpdatesProps {
  [key: string]: {
    readonly dataId: string;
    readonly region: string;
    readonly customer: string;
    readonly type: string;
    readonly helpdesk: string;
    readonly owner: string;
    readonly timeTaken: number | undefined;
    readonly selectedDate: Date;
    readonly content: string;
    readonly remark: string | undefined;
  };
}

export interface dailyWorkWithKeyDataProps extends dailyWorkUpdatesProps {}

export interface dailyWorkCompleteProps extends dailyWorkDataProps {
  readonly remark: string;
}

export interface dailyWorkCompleteUpdatesProps {
  [key: string]: {
    readonly dataId: string;
    readonly region: string;
    readonly customer: string;
    readonly type: string;
    readonly helpdesk: string;
    readonly owner: string;
    readonly timeTaken: number;
    readonly selectedDate: Date;
    readonly content: string;
    readonly remark: string;
  };
}

export interface dailyWorkDeleteProps {
  [key:string]:null
}