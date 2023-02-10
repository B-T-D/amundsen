// Copyright Contributors to the Amundsen project.
// SPDX-License-Identifier: Apache-2.0

import axios, { AxiosError, AxiosResponse } from 'axios';
import { DynamicResourceNotice } from 'interfaces';
import * as qs from 'simple-query-string';

export const API_PATH = '/api/notices/v0';

export type NoticesAPI = { msg: DynamicResourceNotice[] };

export function getTableNotices(key: string) {
  const queryParams = qs.stringify({ resource: 'table', key });

  return (
    axios
      .get(`${API_PATH}/get_notices?${queryParams}`)
      // eslint-disable-next-line arrow-body-style
      .then((response: AxiosResponse<NoticesAPI>) => {
        console.log('response', response);

        return {
          data: response.data,
          statusCode: response.status,
        };
      })
      .catch((e: AxiosError<NoticesAPI>) => {
        const { response } = e;
        const statusMessage = response?.data?.msg;
        const statusCode = response?.status;

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ statusCode, statusMessage });
      })
  );
}
