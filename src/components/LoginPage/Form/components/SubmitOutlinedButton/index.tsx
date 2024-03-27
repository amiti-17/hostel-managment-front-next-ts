import { strConstants } from "config/system/constants/strConstants";
import { LoginPageButton } from "components/LoginPage/Form/styled/LoginPageButton";

type SubmitOutlinedButtonType = { isLoading: boolean, isDisabled: boolean }

export function SubmitOutlinedButton(props: SubmitOutlinedButtonType) {
  
  const { isLoading, isDisabled } = props;

  return (
    <LoginPageButton
      type="submit"
      variant="outlined"
      disabled={isDisabled}
      fullWidth
    >
      {isLoading && strConstants.loadingLong}
      {!isLoading && strConstants.signIn}
    </LoginPageButton>
  )
}