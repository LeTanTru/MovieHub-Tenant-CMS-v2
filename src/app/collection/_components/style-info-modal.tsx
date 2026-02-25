'use client';

import { Col, ImageField, Row } from '@/components/form';
import { Modal } from '@/components/modal';
import { StyleResType } from '@/types';
import { renderImageUrl } from '@/utils';

export default function StyleInfoModal({
  opened,
  onClose,
  style
}: {
  opened: boolean;
  onClose: () => void;
  style: StyleResType;
}) {
  return (
    <Modal
      open={opened}
      onClose={onClose}
      title='Thông tin thiết kế'
      bodyWrapperClassName='w-200'
      bodyClassName='p-4'
      closeOnBackdropClick
    >
      <Row className='mb-0'>
        <Col span={24}>
          <div className='flex items-center gap-2'>
            <label className='block text-sm font-bold text-gray-700'>
              Tên thiết kế:
            </label>
            <span className='text-gray-900'>{style.name || '------'}</span>
          </div>
        </Col>
      </Row>
      <Row className='mb-0'>
        <Col span={24}>
          <div className='flex items-center gap-2'>
            <label className='block text-sm font-bold text-gray-700'>
              Loại:
            </label>
            <span className='text-gray-900'>{style.type || '------'}</span>
          </div>
        </Col>
      </Row>
      <Row className='mb-0'>
        <Col span={24}>
          <label className='mb-1 block text-sm font-bold text-gray-700'>
            Ảnh:
          </label>
          {style.imageUrl ? (
            <ImageField
              disablePreview={false}
              src={renderImageUrl(style.imageUrl)}
              previewAspect={2 / 3}
              originalSize
            />
          ) : (
            <span className='text-gray-500'>Không có ảnh</span>
          )}
        </Col>
      </Row>
    </Modal>
  );
}
