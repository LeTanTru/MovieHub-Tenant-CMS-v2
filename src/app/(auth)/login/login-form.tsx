'use client';

import { logoWithText } from '@/assets';
import {
  Button,
  Col,
  InputField,
  PasswordField,
  Row,
  SelectField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import {
  ErrorCode,
  KIND_MANAGER,
  LOGIN_TYPE_MANAGER,
  loginOptions,
  storageKeys
} from '@/constants';
import { logger } from '@/logger';
import { loginSchema } from '@/schemaValidations';
import type { ApiResponse, LoginBodyType, LoginResType } from '@/types';
import { notify, setData } from '@/utils';
import envConfig from '@/config';
import {
  useEmployeeProfileQuery,
  useLoginEmployeeMutation,
  useLoginManagerMutation,
  useManagerProfileQuery
} from '@/queries';
import { useAppLoadingStore, useAuthStore } from '@/store';
import Image from 'next/image';

export default function LoginForm() {
  const { refetch: getManagerProfile } = useManagerProfileQuery();
  const { refetch: getEmployeeProfile } = useEmployeeProfileQuery();

  const { mutateAsync: loginManagerMutate, isPending: loginManagerLoading } =
    useLoginManagerMutation();
  const { mutateAsync: loginEmployeeMutate, isPending: loginEmployeeLoading } =
    useLoginEmployeeMutation();

  const setLoading = useAppLoadingStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);

  const loading = loginManagerLoading || loginEmployeeLoading;

  const defaultValues: LoginBodyType = {
    username: '',
    password: '',
    grant_type: envConfig.NEXT_PUBLIC_GRANT_TYPE,
    tenantId: envConfig.NEXT_PUBLIC_TENANT_ID,
    loginType: LOGIN_TYPE_MANAGER
  };

  const handleLoginSuccess = async (res: LoginResType | ApiResponse<any>) => {
    if ((res as ApiResponse<any>).result === false) {
      const code = (res as ApiResponse<any>).code;
      if (code === ErrorCode.ACCOUNT_ERROR_LOCKED) {
        notify.error('Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên');
      }
    } else {
      const _res = res as LoginResType;
      notify.success('Đăng nhập thành công');
      setData(storageKeys.ACCESS_TOKEN, _res?.access_token!);
      setData(storageKeys.REFRESH_TOKEN, _res?.refresh_token!);
      setData(storageKeys.USER_KIND, _res?.user_kind?.toString()!);
      const profileQuery =
        _res.user_kind && +_res.user_kind === KIND_MANAGER
          ? getManagerProfile
          : getEmployeeProfile;
      const profile = await profileQuery();
      if (profile.data?.data) {
        setProfile(profile.data?.data);
        setLoading(true);
      }
    }
  };

  const handleLoginError = (error: Error) => {
    logger.error('Error while logging in', error);
    notify.error('Đăng nhập thất bại');
  };

  const onSubmit = async (values: LoginBodyType) => {
    const payload: Omit<LoginBodyType, 'loginType'> = {
      grant_type: values.grant_type,
      password: values.password,
      tenantId: values.tenantId,
      username: values.username
    };

    if (values.loginType === LOGIN_TYPE_MANAGER) {
      await loginManagerMutate(payload as any, {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError
      });
    } else {
      await loginEmployeeMutate(values, {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError
      });
    }
  };

  return (
    <BaseForm
      defaultValues={defaultValues}
      schema={loginSchema}
      onSubmit={onSubmit}
      className='flex flex-col items-center justify-around gap-0 rounded-lg px-6 py-6 shadow-[0px_0px_10px_2px] shadow-black/20 max-[1560px]:w-120 min-[1560px]:w-120'
    >
      {(form) => (
        <>
          <Row className='mb-2 w-full'>
            <Col span={24} className='items-center justify-center px-0'>
              <div className='bg-sidebar/80 mx-auto flex w-full items-center justify-center rounded py-2'>
                <Image
                  src={logoWithText.src}
                  width={180}
                  height={50}
                  alt='MovieHub Logo'
                />
              </div>
            </Col>
          </Row>
          <Row className='w-full flex-col gap-5 *:px-0'>
            <Col span={24}>
              <InputField
                name='username'
                control={form.control}
                label='Tên đăng nhập'
                placeholder='Tên đăng nhập'
                required
              />
            </Col>
            <Col span={24}>
              <PasswordField
                name='password'
                control={form.control}
                label='Mật khẩu'
                placeholder='Mật khẩu'
                required
              />
            </Col>
            {/* <Col span={24}>
              <InputField
                name='tenantId'
                control={form.control}
                label='Mã thuê bao (Tenant Id)'
                placeholder='Mã thuê bao (Tenant Id)'
                required
              />
            </Col> */}
            <Col span={24}>
              <SelectField
                options={loginOptions}
                name='loginType'
                control={form.control}
                label='Vai trò'
                placeholder='Vai trò'
                required
              />
            </Col>
          </Row>
          <Row className='mb-0 w-full'>
            <Col className='my-0 px-0' span={24}>
              <Button
                disabled={!form.formState.isDirty || loading}
                variant={'primary'}
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Col>
          </Row>
        </>
      )}
    </BaseForm>
  );
}
