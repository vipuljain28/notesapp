import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchContacts } from '@store/contactThunks'
import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from '@store/selectors'

export function useContacts() {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)
  const loading = useAppSelector(selectContactsLoading)
  const error = useAppSelector(selectContactsError)

  useEffect(() => {
    void dispatch(fetchContacts(undefined))
  }, [dispatch])

  return {
    contacts,
    loading,
    error,
    refresh: () => dispatch(fetchContacts({ force: true })),
  }
}
