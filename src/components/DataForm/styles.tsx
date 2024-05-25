import styled from 'styled-components';

const BoxCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .arco-form-item-status-error
    .arco-input-inner-wrapper:not(.arco-input-inner-wrapper-disabled) {
    border-color: #f5222d;
  }

  .arco-col svg {
    display: inline-block;
    vertical-align: inherit;
  }
`;

export const SingleFormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

export const GroupFormContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
`;

export const GroupFormWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;

  .group-form-header {
    justify-content: space-between;
    padding: 12px 16px;
    background-color: #f9f9f9;

    .group-form-title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > svg {
        transition: rotate 0.3s;
      }
    }

    .group-form-title {
      font-weight: bold;
    }

    .group-form-subtitle {
      font-size: 12px;
      color: #666;
    }
  }

  .group-form-subtitle-area {
    .group-form-header {
      background-color: transparent;
      font-weight: bold;
    }
  }

  .group-header-ref-fold {
    transition: display 0.3s;
    display: none;
  }

  .group-header-ref-unfold {
    transition: display 0.3s;
    display: block;
  }

  /* theme */
  .group-header-classic {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 3px;
      border-radius: 2px;
      background-color: var(--color-primary-light-6);
    }
  }
`;

export const GroupTitle = styled.p`
  margin-bottom: 0;
`;

export const EmptyContentContainer = styled(BoxCenter)`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const GroupHeader = styled(BoxCenter)<{
  titleLevel?: number;
}>`
  justify-content: space-between;
  padding: 12px 16px;
  ${({ titleLevel }) => {
    return titleLevel === 1
      ? `
    background-color: #f6f9f9;
    `
      : '';
  }}
`;
