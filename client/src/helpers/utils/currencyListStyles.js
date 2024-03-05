import styled from 'styled-components';
import dropdownIcon from '../../../src/assets/dropdownIcon.svg'

export const StyledSelect = styled.select`
    appearance: none;
    padding: 8px 32px 8px 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: url(${dropdownIcon}) no-repeat center center;
    background-size: 16px;
    `;