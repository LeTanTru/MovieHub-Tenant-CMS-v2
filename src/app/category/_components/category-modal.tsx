'use client';

import { Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { CircleLoading } from '@/components/loading';
import { Modal } from '@/components/modal';
import {
  apiConfig,
  categoryErrorMaps,
  queryKeys,
  STATUS_ACTIVE
} from '@/constants';
import { useSaveBase } from '@/hooks';
import { categorySchema } from '@/schemaValidations';
import type { CategoryBodyType, CategoryResType } from '@/types';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export default function CategoryModal({
  open,
  category,
  onClose
}: {
  open: boolean;
  category: CategoryResType | null;
  onClose: () => void;
}) {
  const {
    data,
    loading,
    isEditing,
    isFormChanged,
    onFormChange,
    handleSubmit,
    renderActions
  } = useSaveBase<CategoryResType, CategoryBodyType>({
    apiConfig: apiConfig.category,
    options: {
      queryKey: queryKeys.CATEGORY,
      objectName: 'danh mục',
      pathParams: {
        id: category?.id
      },
      mode: !category ? 'create' : 'edit'
    },
    override: (handlers) => {
      handlers.handleSubmitSuccess = async () => {
        onClose();
      };
    }
  });

  const defaultValues: CategoryBodyType = {
    name: '',
    status: STATUS_ACTIVE
  };

  const initialValues: CategoryBodyType = useMemo(() => {
    return {
      name: data?.name ?? '',
      status: STATUS_ACTIVE
    };
  }, [data?.name]);

  const onSubmit = async (
    values: CategoryBodyType,
    form: UseFormReturn<CategoryBodyType>
  ) => {
    await handleSubmit(
      {
        ...values
      },
      form,
      categoryErrorMaps
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${!isEditing ? 'Thêm mới' : 'Cập nhật'} danh mục`}
      bodyWrapperClassName='w-200 max-[1537px]:w-175 max-[1367px]:w-150 top-1/3'
      aria-labelledby='category-modal-title'
      confirmOnClose={isFormChanged}
    >
      <BaseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={categorySchema}
        initialValues={initialValues}
        onFormChange={onFormChange}
      >
        {(form) => (
          <>
            <Row>
              <Col span={24}>
                <InputField
                  control={form.control}
                  name='name'
                  label='Tên danh mục'
                  placeholder='Tên danh mục'
                  required
                />
              </Col>
            </Row>

            <>
              {renderActions(form, {
                onCancel: onClose
              })}
            </>
            {loading && (
              <div className='absolute inset-0 bg-white/80'>
                <CircleLoading className='stroke-dodger-blue mt-20 size-8' />
              </div>
            )}
          </>
        )}
      </BaseForm>
    </Modal>
  );
}
