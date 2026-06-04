import { renderHook, act } from '@testing-library/react-native';
import useDebounce from '../useDebounce';
beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});
describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 400));
    expect(result.current).toBe('hello');
  });
  it('does NOT update the value before the delay', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: 'hello' } },
    );
    rerender({ value: 'world' });
    // Advance only 200ms — not enough
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe('hello');
  });
  it('updates the value AFTER the delay', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: 'hello' } },
    );
    rerender({ value: 'world' });
    act(() => jest.advanceTimersByTime(400));
    expect(result.current).toBe('world');
  });
  it('resets the timer on rapid changes (only last value emitted)', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: 'a' } },
    );
    rerender({ value: 'ab' });
    act(() => jest.advanceTimersByTime(200));
    rerender({ value: 'abc' });
    act(() => jest.advanceTimersByTime(200));
    // 'ab' should NOT have been emitted because we changed before 400ms
    expect(result.current).toBe('a');
    // Now wait the full delay for 'abc'
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe('abc');
  });
  it('respects a custom delay', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'x' } },
    );
    rerender({ value: 'y' });
    act(() => jest.advanceTimersByTime(999));
    expect(result.current).toBe('x');
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe('y');
  });
});
