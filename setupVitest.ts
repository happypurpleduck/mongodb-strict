import { setup } from "@ark/attest";

export default (): () => void => setup({
	shouldFormat: true,
});
