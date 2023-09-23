CREATE OR REPLACE FUNCTION check_squad_entry_count() RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM public.user_squad_entry
    where position_id = NEW.position_id
    ) > (
      SELECT required_goalkeepers from public.squad_configs where league_id = NEW.league_id
    ) THEN
    RAISE EXCEPTION 'Reached maximum number of goalkeepers allowed per team';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_count_trigger BEFORE INSERT OR UPDATE ON public.user_squad_entry FOR EACH ROW EXECUTE PROCEDURE check_squad_entry_count();
